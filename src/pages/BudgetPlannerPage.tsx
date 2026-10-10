import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storageService } from '../services/storage';
import { Trip, Expense, ExpenseCategoryKey, BudgetCategoryKey } from '../types';
import { formatINR, formatDate, getCategoryBadgeColor } from '../utils/formatters';
import {
  Wallet,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  CreditCard,
  Sparkles,
  PieChart,
  Calendar,
  X,
  Users,
} from 'lucide-react';

export const BudgetPlannerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Add / Edit Expense Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  // Expense form fields
  const [amount, setAmount] = useState<number>(500);
  const [category, setCategory] = useState<ExpenseCategoryKey>('food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [paidBy, setPaidBy] = useState('Self');

  const loadTrip = () => {
    if (id) {
      const found = storageService.getTrip(id);
      if (found) setTrip(found);
    }
  };

  useEffect(() => {
    loadTrip();
  }, [id]);

  if (!trip) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-[#142B4A]">Trip Not Found</h2>
        <Link
          to="/my-trips"
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2878D0] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Trips</span>
        </Link>
      </div>
    );
  }

  const expenses = trip.expenses || [];
  const plannedBudget = trip.budget?.total || 0;
  const totalSpent = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const remainingBudget = plannedBudget - totalSpent;
  const spendingPercentage = plannedBudget > 0 ? Math.min(100, Math.round((totalSpent / plannedBudget) * 100)) : 0;
  const costPerTraveller = trip.travellers > 0 ? Math.round(totalSpent / trip.travellers) : totalSpent;

  // Category-wise totals breakdown
  const categorySpending = useMemo(() => {
    const cats: Record<string, { spent: number; planned: number }> = {
      transport: { spent: 0, planned: trip.budget?.categories?.transport || 0 },
      accommodation: { spent: 0, planned: trip.budget?.categories?.accommodation || 0 },
      food: { spent: 0, planned: trip.budget?.categories?.food || 0 },
      activities: { spent: 0, planned: trip.budget?.categories?.activities || 0 },
      localTravel: { spent: 0, planned: trip.budget?.categories?.localTravel || 0 },
      shopping: { spent: 0, planned: trip.budget?.categories?.shopping || 0 },
      miscellaneous: { spent: 0, planned: 0 },
      emergency: { spent: 0, planned: trip.budget?.categories?.emergency || 0 },
    };

    expenses.forEach((e) => {
      if (cats[e.category]) {
        cats[e.category].spent += e.amount || 0;
      } else {
        cats.miscellaneous.spent += e.amount || 0;
      }
    });

    return cats;
  }, [expenses, trip.budget]);

  const saveUpdatedExpenses = (newExpenses: Expense[], msg: string) => {
    const updatedTrip: Trip = { ...trip, expenses: newExpenses };
    storageService.saveTrip(updatedTrip);
    setTrip(updatedTrip);
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setEditingExpenseId(null);
    setAmount(500);
    setCategory('food');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setPaidBy('Self');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exp: Expense) => {
    setModalMode('edit');
    setEditingExpenseId(exp.id);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDescription(exp.description);
    setDate(exp.date);
    setPaidBy(exp.paidBy || 'Self');
    setIsModalOpen(true);
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || amount <= 0) return;

    const newExp: Expense = {
      id: editingExpenseId || `exp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      category,
      description: description.trim(),
      amount: Number(amount) || 0,
      date,
      paidBy: paidBy.trim() || 'Self',
    };

    let updatedList: Expense[];
    if (modalMode === 'add') {
      updatedList = [newExp, ...expenses];
    } else {
      updatedList = expenses.map((e) => (e.id === editingExpenseId ? newExp : e));
    }

    saveUpdatedExpenses(updatedList, modalMode === 'add' ? 'Expense added!' : 'Expense updated!');
    setIsModalOpen(false);
  };

  const handleDeleteExpense = (expId: string) => {
    const updatedList = expenses.filter((e) => e.id !== expId);
    saveUpdatedExpenses(updatedList, 'Expense deleted');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-slideUp">
          <Sparkles className="w-4 h-4 text-[#FF8748]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to={`/trip/${trip.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7A90] hover:text-[#2878D0] mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {trip.name} Hub</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A]">
            Budget & Expense Manager
          </h1>
          <p className="text-xs text-[#6B7A90] mt-0.5">
            Keep your finances on track in Indian Rupees (₹ INR). Compare actual expenses against allocations.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white text-xs font-bold shadow-md shadow-[#FF8748]/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Expense</span>
        </button>
      </div>

      {/* Overbudget Warning */}
      {remainingBudget < 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600" />
          <div className="text-xs">
            <span className="font-bold">Budget Exceeded Alert:</span> You have spent {formatINR(Math.abs(remainingBudget))} more than your planned budget of {formatINR(plannedBudget)}.
          </div>
        </div>
      )}

      {/* Main Budget Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5">
          <span className="block text-[11px] font-semibold text-[#6B7A90] uppercase">Total Planned</span>
          <span className="text-2xl font-black text-[#142B4A] mt-1 block">
            {formatINR(plannedBudget)}
          </span>
          <span className="text-[11px] text-[#2878D0] mt-1 block">Baseline target</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5">
          <span className="block text-[11px] font-semibold text-[#6B7A90] uppercase">Total Spent</span>
          <span className="text-2xl font-black text-[#36B7A0] mt-1 block">
            {formatINR(totalSpent)}
          </span>
          <span className="text-[11px] text-[#6B7A90] mt-1 block">{spendingPercentage}% of budget</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5">
          <span className="block text-[11px] font-semibold text-[#6B7A90] uppercase">Remaining</span>
          <span
            className={`text-2xl font-black mt-1 block ${
              remainingBudget < 0 ? 'text-[#D64545]' : 'text-[#2878D0]'
            }`}
          >
            {formatINR(remainingBudget)}
          </span>
          <span className="text-[11px] text-[#6B7A90] mt-1 block">
            {remainingBudget < 0 ? 'Deficit' : 'Available balance'}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5">
          <span className="block text-[11px] font-semibold text-[#6B7A90] uppercase">Cost Per Traveller</span>
          <span className="text-2xl font-black text-[#142B4A] mt-1 block">
            {formatINR(costPerTraveller)}
          </span>
          <span className="text-[11px] text-[#6B7A90] mt-1 block">
            For {trip.travellers} {trip.travellers === 1 ? 'person' : 'people'}
          </span>
        </div>
      </div>

      {/* Spending Progress Bar */}
      <div className="bg-white rounded-2xl border border-[#E3EAF2] p-5 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-[#142B4A]">Budget Consumption</span>
          <span className="font-bold text-[#2878D0]">{spendingPercentage}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              remainingBudget < 0 ? 'bg-[#D64545]' : spendingPercentage > 80 ? 'bg-amber-500' : 'bg-[#36B7A0]'
            }`}
            style={{ width: `${Math.min(100, (totalSpent / (plannedBudget || 1)) * 100)}%` }}
          />
        </div>
      </div>

      {/* Category Breakdown & Comparison */}
      <div className="bg-white rounded-3xl border border-[#E3EAF2] p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#142B4A]">Category Spending vs. Plan</h2>
          <p className="text-xs text-[#6B7A90] mt-0.5">
            Compare actual expenses logged in each bucket with your original plan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(categorySpending).map(([catKey, data]) => {
            const isOver = data.planned > 0 && data.spent > data.planned;
            return (
              <div
                key={catKey}
                className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#E3EAF2] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold capitalize text-[#142B4A]">{catKey}</span>
                  {isOver && (
                    <span className="text-[10px] font-bold text-[#D64545] bg-rose-50 px-1.5 py-0.2 rounded">
                      Over Plan
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-sm font-black text-[#142B4A]">{formatINR(data.spent)}</span>
                  <span className="text-[11px] text-[#6B7A90]">Plan: {formatINR(data.planned)}</span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isOver ? 'bg-[#D64545]' : 'bg-[#2878D0]'}`}
                    style={{
                      width: `${data.planned > 0 ? Math.min(100, (data.spent / data.planned) * 100) : data.spent > 0 ? 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recorded Expenses List */}
      <div className="bg-white rounded-3xl border border-[#E3EAF2] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#142B4A]">Recorded Expenses</h2>
            <p className="text-xs text-[#6B7A90] mt-0.5">
              {expenses.length} transaction entries logged for this trip
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EAF4FF] text-[#2878D0] text-xs font-bold hover:bg-[#2878D0] hover:text-white transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Expense</span>
          </button>
        </div>

        {expenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3EAF2] text-[#6B7A90] font-semibold">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Description</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Paid By</th>
                  <th className="pb-3 font-semibold text-right">Amount (₹ INR)</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAF2]">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="py-3 text-[#6B7A90] whitespace-nowrap">{formatDate(exp.date)}</td>
                    <td className="py-3 font-bold text-[#142B4A]">{exp.description}</td>
                    <td className="py-3 capitalize">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3 text-[#6B7A90]">{exp.paidBy || 'Self'}</td>
                    <td className="py-3 font-bold text-[#142B4A] text-right whitespace-nowrap">
                      {formatINR(exp.amount)}
                    </td>
                    <td className="py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(exp)}
                          className="p-1.5 rounded-lg text-[#2878D0] hover:bg-white"
                          title="Edit expense"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(exp.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                          title="Delete expense"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center border-2 border-dashed border-[#E3EAF2] rounded-2xl">
            <Wallet className="w-8 h-8 text-[#6B7A90] mx-auto mb-2 opacity-50" />
            <h4 className="text-sm font-bold text-[#142B4A]">No expenses recorded yet</h4>
            <p className="text-xs text-[#6B7A90] mt-1">
              Start adding your flight bookings, hotel deposits, and local meals!
            </p>
            <button
              onClick={handleOpenAddModal}
              className="mt-4 px-4 py-2 rounded-xl bg-[#2878D0] text-white text-xs font-bold"
            >
              Add First Expense
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-[#E3EAF2]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EAF2]">
              <h3 className="text-lg font-bold text-[#142B4A]">
                {modalMode === 'add' ? 'Log New Expense' : 'Edit Expense'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#142B4A] mb-1">
                  Amount in ₹ INR *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  step={10}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E3EAF2] text-sm font-bold text-[#142B4A] bg-[#F7F9FC]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B4A] mb-1">Description *</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Flight ticket, Hotel advance, Dinner at Martin's Corner..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E3EAF2] text-xs text-[#142B4A] bg-[#F7F9FC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ExpenseCategoryKey)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                  >
                    <option value="transport">Transportation</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="food">Food & Dining</option>
                    <option value="activities">Activities & Sightseeing</option>
                    <option value="localTravel">Local Travel (Cabs/Auto)</option>
                    <option value="shopping">Shopping</option>
                    <option value="miscellaneous">Miscellaneous</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B4A] mb-1">Paid By</label>
                <input
                  type="text"
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  placeholder="e.g. Self, Friend, Split..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E3EAF2] text-xs bg-[#F7F9FC]"
                />
              </div>

              <div className="pt-4 border-t border-[#E3EAF2] flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#142B4A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#FF8748] hover:bg-[#F27330] text-white text-xs font-bold shadow-sm"
                >
                  {modalMode === 'add' ? 'Save Expense' : 'Update Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
