require 'json'

# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Sample guardfile block for Guard::Haml
# You can use some options to change guard-haml configuration
# output: 'public'                   set output directory for compiled files
# input: 'src'                       set input directory with haml files
# run_at_start: true                 compile files when guard starts
# notifications: true                send notifictions to Growl/libnotify/Notifu
# haml_options: { ugly: true }    pass options to the Haml engine

def check_for_topic m
  short = m.partition( "/" ).last.gsub( /\.html\.haml/, "" )
  if short[0] =~ /[A-Z]/
    add_to_json( short )
  end
end 

TOPICS_JSON = "web/topic.json"

def add_to_json( name )
  the_json = File.read( TOPICS_JSON ) if File.exists? TOPICS_JSON
  if the_json
    parsed = JSON.parse( the_json )
  else
    parsed = { 'items' => {} }
  end
  unless parsed['items'][name]
    parsed['items'][name] = { name: name }
  end
  puts "Writing out: #{parsed.inspect}"
  File.write( TOPICS_JSON, parsed.to_json )
  
end

guard :haml, output: 'web', input: 'templates' do
  watch( %r{^.+(\.html\.haml)$} ) { |m| 
    check_for_topic( m[0] )
    m[0]
  }

end

guard 'livereload', input: 'web' do
  watch(%r{^.+\.(css|js|html)$})
end

guard 'coffeescript', :input => 'coffee', output: 'web'
guard 'coffeescript', :input => 'spec', output: 'test'
