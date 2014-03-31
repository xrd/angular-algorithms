# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Sample guardfile block for Guard::Haml
# You can use some options to change guard-haml configuration
# output: 'public'                   set output directory for compiled files
# input: 'src'                       set input directory with haml files
# run_at_start: true                 compile files when guard starts
# notifications: true                send notifictions to Growl/libnotify/Notifu
# haml_options: { ugly: true }    pass options to the Haml engine

guard :haml, output: 'web', input: 'templates' do
  watch %r{^.+(\.html\.haml)$}
end

guard 'livereload', input: 'web' do
  watch(%r{^.+\.(css|js|html)$})
end

guard 'coffeescript', :input => 'coffee', output: 'web'
