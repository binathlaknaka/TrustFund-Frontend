const CharityCard = ({ name, description, amount }) => {
  return (
    <div class="bg-blue-100 p-4 rounded-lg flex flex-col">
      {/* Logo */}
      <div class="flex justify-center mb-2">
        <div class="bg-white p-3 rounded-lg">
          <div class="text-red-500 flex justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 10C20 10 16 3 10 3C4 3 4 10 4 10C4 16 12 25 20 30M20 10C20 10 24 3 30 3C36 3 36 10 36 10C36 16 28 25 20 30" stroke="#ff5533" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Charity Name */}
      <h2 class="text-2xl font-bold text-center text-black">Charity</h2>
      <p class="text-sm text-center text-gray-600 mb-2">{name}</p>
      
      {/* Description */}
      <p class="text-xs text-gray-700 mb-4">
        {description || "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"}
      </p>
      
      {/* Progress Bar */}
      <div class="h-1 w-full bg-gray-300 rounded mb-2">
        <div class="h-full bg-black rounded" style={{ width: '30%' }}></div>
      </div>
      
      {/* Amount and Donate Button */}
      <div class="flex justify-between items-center mt-2">
        <span class="text-sm font-medium text-black">${amount || "1000"}</span>
        <button class="bg-gray-200 text-black text-sm px-4 py-1 rounded-full">Donate</button>
      </div>
    </div>
  );
};

export default CharityCard;