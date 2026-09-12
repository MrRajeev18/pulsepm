#!/usr/bin/env ruby
# PulsePM Local Server using Ruby standard library WEBrick
require 'webrick'

root = File.expand_path(__dir__)
port = ENV['PORT'] ? ENV['PORT'].to_i : 3000

puts "=================================================="
puts "  PulsePM - Unified Project Management Platform   "
puts "=================================================="
puts " Serving from: #{root}"
puts " Local URL:    http://localhost:#{port}"
puts " Press Ctrl+C to stop the server"
puts "=================================================="

server = WEBrick::HTTPServer.new(
  :Port => port,
  :DocumentRoot => root
)

trap('INT') { server.shutdown }
trap('TERM') { server.shutdown }

server.start
