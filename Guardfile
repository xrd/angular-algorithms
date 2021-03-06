require 'json'
require 'yaml'

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
    parsed['items'][name] = { name: name, enabled: false }
  end
  puts "Writing out: #{parsed.inspect}"
  File.write( TOPICS_JSON, JSON.pretty_generate( parsed ) )
  
end


guard :haml, output: 'web', input: 'templates' do
  watch( %r{^.+(\.html\.haml)$} ) { |m| 
    check_for_topic( m[0] )
    m[0]
  }

end

# guard 'livereload', input: 'web' do
#   watch(%r{^.+\.(css|js|html)$})
# end

guard 'coffeescript', :input => 'coffee', output: 'web/js'
guard 'coffeescript', :input => 'spec', output: 'test'

module ::Guard
  class Yaml2Json < Guard
    def start
      puts "Start doing something"
    end

    def stop
    end

    def reload
      stop
      start
    end

    def run_all
      true
    end

    def run_on_change(paths)
      paths.each do |p|
        puts "Got file: #{p}"
        obj = YAML.load( File.read( p ) )
        the_json = JSON.pretty_generate( obj )
        File.open( "web/big_o.json", "w+" ) do |f|
          f.write the_json
        end
        File.open( "test/big_o.js", "w+" ) do |f|
          wo_single_quotes = the_json.gsub "'", ""
          f.write "var BIG_O = #{wo_single_quotes};"
        end
      end
      true
    end
  end
end

# Available options: :pidfile, :port, :executable
guard 'yaml2json' do
  watch(%r{^.+\.yml$})
end
