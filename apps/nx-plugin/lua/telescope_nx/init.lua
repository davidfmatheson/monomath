local pickers = require('telescope.pickers')
local finders = require('telescope.finders')
local previewers = require('telescope.previewers')
local utils = require('telescope.previewers.utils')
local config = require('telescope.config').values

local log = require('plenary.log'):new()
log.level = 'debug'

local M = {}

M.show_nx_console = function (opts)
  pickers.new(opts, {
    finder = finders.new_async_job({
      command_generator = function ()
        return { "npx", "nx", "show", "projects" }
      end,
      entry_maker = function (entry)
        return {
          value = entry,
          display = entry,
          ordinal = entry,
        }
      end
    }),
    sorter = config.generic_sorter(opts),
    previewer = previewers.new_buffer_previewer({
      title = "Nx Available Commands",
      define_preview = function (self, entry)
        vim.api.nvim_buf_set_lines(self.state.bufnr, 0, 0, true, vim.split(vim.inspect(entry.value), "\n"))
      end,
    }),
  }):find()
end

M.show_nx_console()

return M
