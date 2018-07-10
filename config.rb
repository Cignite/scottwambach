# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# data.pages.each do |page|
#   if page.first == 'home'
#     proxy '/index.html', "/templates/#{page[1].template}.html", locals: { page_name: page.first, page: page[1] }, ignore: true
#   else
#     proxy "/#{page.first.gsub('_', '/')}/index.html", "/templates/#{page[1].template}.html", locals: { page_name: page.first, page: page[1] }, ignore: true
#   end
# end

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

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

set :css_dir, 'styles'
set :images_dir, 'images'
set :js_dir, 'js'
set :fonts_dir, 'fonts'

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

data.pages.each do |page|
  proxy "/#{page.first.gsub('_', '/')}/index.html", "/templates/page.html", locals: { page_name: page[1].title, content: page[1] }, ignore: true
end

data.projects.each do |project|
  proxy "/work/#{project.title.downcase.gsub(' ', '-')}/index.html", "/templates/project.html", locals: { project_name: project.title, content: project }, ignore: true
end

configure :build do
  activate :minify_html
  activate :external_pipeline,
    name: :gulp,
    command: 'gulp build',
    source: '.tmp',
    latency: 1
  ignore 'js/**/*.js'
  ignore 'styles/site'
  ignore 'styles/site.css.css'
  ignore 'styles/site.css.css.map'
  ignore '*.keep'
  ignore '*.sass'
end

configure :development do
  activate :external_pipeline,
    name: :gulp,
    command: 'gulp',
    source: '.tmp',
    latency: 1
  ignore 'styles/site'
  ignore 'styles/site.css.css'
  ignore 'styles/site.css.css.map'
end
