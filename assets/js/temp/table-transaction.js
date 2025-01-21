export let TableTransaction = `
    <li class="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
          <div>
            <span>#CATEGORY#</span>
            <p class="text-xs mt-2 text-gray-200">#DESC#</p>
            <p class="text-xs mt-2 text-gray-400">#DATE#</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-red-500">#AMOUNT#</span>
            <button class="text-blue-500 hover:text-blue-400 edit-transaction-button" data-edit-transaction-id="#TRANSACTION_EDIT_ID#">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="text-red-500 hover:text-red-400 delete-transaction-button" data-transaction-id="#TRANSACTION_ID#">
                <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
`;