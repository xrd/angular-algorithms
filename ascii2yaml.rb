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


require 'yaml'

file = ARGV.shift
contents = File.read file
lines = contents.split /\n/
columns = lines[1].split( /\|/  ).map { |c| c.strip.gsub( /^:$/, '' ) }.flatten
lines.shift
lines.shift

all = []

lines.each do |l|
  obj = {}
  fields = l.split /\|/
  columns.each do |c|
    obj[c] = fields.shift
  end
  all << obj
end

puts all.to_yaml
