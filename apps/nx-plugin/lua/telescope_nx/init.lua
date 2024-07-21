local pickers = require('telescope.pickers')
local finders = require('telescope.finders')
local previewers = require('telescope.previewers')
local utils = require('telescope.previewers.utils')
local config = require('telescope.config').values

local log = require('plenary.log'):new()
log.level = 'debug'

local M = {}

local shell_script = [[
  for project in `npx nx show projects`; do
    npx nx show project $project --json
  done
]]

M.show_nx_console = function (opts)
  opts = opts or {}
  pickers.new(opts, {
    finder = finders.new_async_job({
      command_generator = function ()
        return { "sh", "-c", shell_script }
      end,
      entry_maker = function (entry)
        local parsed = vim.json.decode(entry)
        if parsed then
          return {
            value = parsed,
            display = parsed.name,
            ordinal = parsed.name,
          }
        end
      end
    }),
    sorter = config.generic_sorter(opts),
    previewer = previewers.new_buffer_previewer({
      title = "Nx Available Commands",
      define_preview = function (self, entry)
        local targets = {}
        for k,v in pairs(entry.value.targets) do table.insert(targets, k) end
        vim.api.nvim_buf_set_lines(self.state.bufnr, 0, 0, true, vim.split(vim.inspect(targets), ","))
      end,
    }),
  }):find()
end

M.show_nx_console()

return M
