local pickers = require('telescope.pickers')
local finders = require('telescope.finders')
local config = require('telescope.config').values

local M = {}

M.show_nx_console = function (opts)
  pickers.new(opts, {
    finder = finders.new_table({
      "Yes",
      "No",
      "Maybe",
    }),
    sorter = config.generic_sorter(opts),
  }):find()
end

M.show_nx_console()

return M
