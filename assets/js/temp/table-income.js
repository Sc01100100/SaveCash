export let TableIncome = `
   <li class="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
        <div>
            <span>#SOURCE#</span>
            <p class="text-xs mt-2 text-gray-400">#DATE#</p>
        </div>
        <div class="flex items-center gap-4">
            <span class="text-green-500">#AMOUNT#</span>
            <button 
                class="text-blue-500 hover:text-blue-400 edit-income-button" 
                data-edit-income-id="#INCOME_EDIT_ID#">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button 
                class="text-red-500 hover:text-red-400 delete-income-button" 
                data-income-id="#INCOME_ID#">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </li>
`;
