# activate :directory_indexes

set :relative_links, true
set :haml, { format: :html5 }

# Disable Haml warnings
Haml::TempleEngine.disable_option_validator!

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/404.html', directory_index: false
# page '/*', layout: false

set :css_dir, 'stylesheets'
set :images_dir, 'images'
set :js_dir, 'javascripts'
set :fonts_dir, 'fonts'

helpers do
  def random_image()
    "/images/placeholder/image#{rand(1..20)}.jpg"
  end
  def random_user()
    "/images/users/user_#{rand(1..2)}.jpg"
  end
  def random_video()
    "/images/videos/temp_vid_#{rand(1..6)}.mp4"
  end
end

configure :build do
  activate :external_pipeline,
    name: :gulp,
    command: 'npm run production',
    source: '.tmp',
    latency: 1

  ignore 'javascripts/all.js'
  ignore 'stylesheets/site'

  activate :gzip

  activate :minify_html do |html|
    html.remove_quotes = false
    html.remove_intertag_spaces = true
  end
end
