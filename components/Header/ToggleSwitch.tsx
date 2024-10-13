import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeBgColor } from '@/store/slices/ui';

const ToggleSwitch = () => {
    const isToggled = useAppSelector((state) => state.ui.bgColor);
    const dispatch = useAppDispatch();
  
    const handleToggle = () => {
      dispatch(changeBgColor(!isToggled));
    };

  return (
    <div className="flex items-center justify-center">
      <label className="relative cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={!isToggled}
          onChange={handleToggle}
        />
        {/* Внешний блок тумблера */}
        <div
          className={`w-10 h-5 rounded-full relative transition-colors duration-500 ${
            !isToggled
              ? 'bg-white shadow-md'
              : 'bg-black '
          }`}
        >
          {/* Точка внутри тумблера */}
          <div
            className={`absolute top-1 left-1 w-3 h-3 rounded-full transition-all duration-500 transform ${
              !isToggled
                ? 'translate-x-5 bg-black '
                : 'bg-white '
            } border-1 `}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
