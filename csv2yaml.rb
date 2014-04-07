#!/usr/bin/env ruby
#
# Originally written by http://redartisan.com/tags/csv
# Added and minor changes by Gavin Laking
#
# "id","name","mime_type","extensions","icon_url"
# "1","unknown","unknown/unknown","||","/images/icon/file_unknown.gif"
# "2","image/tiff","image/tiff","|tiff|tif|","/images/icon/blank.png"
#
# if you want to remove the id: "number" line from the resulting YAML file
# do a find and replace for: ^( id: \"\d*\"\n) in Textmate

require 'csv'
require 'yaml'

class String
  def unquote
    self.gsub(/^"|"$/, '')
  end
end

# first line contains the field names
line = gets
fields = line.split('","').collect {|f| f.unquote.chomp.gsub( /\s/, '_' ) }

rows = []
CSV.parse(STDIN) do |row|
  obj = {}
  row.each_with_index do |f,i|
    obj[fields[i.to_i]] = row[f]
  end
  rows << obj
end

puts rows.to_yaml
