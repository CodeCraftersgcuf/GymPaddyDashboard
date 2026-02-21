import React, { useEffect, useState } from 'react';
import Vertical from '../../components/alignments/Vertical';
import { Link } from 'react-router-dom';
import { useGetSettings } from '../../utils/queries/settingsQueries';
import { useUpdateSettings } from '../../utils/mutations/settingsMutations';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Loader2, CheckCircle } from 'lucide-react';

const Setting: React.FC = () => {
  const { data: settings, isLoading } = useGetSettings();
  const updateMutation = useUpdateSettings();

  const [form, setForm] = useState({
    video_call_cost: '',
    live_cost: '',
    vip_plan_cost: '',
  });
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({
        video_call_cost: settings.video_call_cost || '0',
        live_cost: settings.live_cost || '0',
        vip_plan_cost: settings.vip_plan_cost || '0',
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(false);
    try {
      await updateMutation.mutateAsync(form);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err?.response?.data?.message || err?.message || 'Failed to save settings.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner className="h-64" />;
  }

  return (
    <>
      <Vertical>
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <Link
          to="/settings/admin/management"
          className="py-2 px-4 bg-[#FF0000] cursor-pointer text-white rounded-md w-fit"
        >
          Admin Management
        </Link>
      </Vertical>

      <form onSubmit={handleSubmit} className="max-w-md p-6 bg-white space-y-6 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video Call Cost
          </label>
          <p className="text-xs text-gray-400 mb-2">Set cost per minute for video call</p>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.video_call_cost}
            onChange={(e) => setForm({ ...form, video_call_cost: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-400"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Live Cost
          </label>
          <p className="text-xs text-gray-400 mb-2">Set cost per minute for live</p>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.live_cost}
            onChange={(e) => setForm({ ...form, live_cost: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-400"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            VIP Plan Cost
          </label>
          <p className="text-xs text-gray-400 mb-2">Set the cost for premium VIP plan</p>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.vip_plan_cost}
            onChange={(e) => setForm({ ...form, vip_plan_cost: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-400"
            placeholder="0.00"
          />
        </div>

        {saveError && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{saveError}</p>
        )}

        {saveSuccess && (
          <p className="text-green-600 text-sm bg-green-50 p-2 rounded flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Settings saved successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
        >
          {updateMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save'}
        </button>
      </form>
    </>
  );
};

export default Setting;
