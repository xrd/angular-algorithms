require 'vcr'
require 'mechanize'

VCR.configure do |c|
  c.cassette_library_dir = 'cached'
  c.hook_into :webmock
  # c.ignore_hosts 'maps.googleapis.com'
end

class Processor

  attr_accessor :mechanize
  attr_accessor :author, :title, :creation_date, :body, :location, :lat, :lng, :ignores, :username

  def scrape
    root = "http://en.wikipedia.org/wiki/Big_O_notation"
    VCR.use_cassette( 'big_o' ) do
      @mechanize.get( root ) do |page|

        ( page / ".wikitable" ).each do |p|
          if p / 'img[alt="0(1)\,"]'
            puts "OK, use this table"
          end
          # puts "Got something #{p.inspect}"
        end
      end
    end
  end
  
  def initialize
    @mechanize = Mechanize.new { |agent|
      agent.user_agent_alias = 'Mac Safari'
    }
    # @ignores = YAML.load_file( "./scraper_ignore.yml" )
  end

end
