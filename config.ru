require 'rubygems'
require 'middleman/rack'

protected_middleman = Rack::Auth::Basic.new(Middleman.server) do |username, password|
  [username, password] == ['redstitch', 'review4u']
end

run protected_middleman
