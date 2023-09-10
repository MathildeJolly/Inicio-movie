export default function Toggle({ checked, handleToggleChange }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer mb-4">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={checked}
                onChange={() => handleToggleChange(!checked)}
            />
            <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full  peer-checked:after:translate-x-full  after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-800 "></div>
            <span className="ml-3 text-sm">{checked ? 'Day' : 'Week'}</span>
        </label>
    );
}
