task :sass_lint do
  print 'Running sass-lint... '
  return false unless system './node_modules/sass-lint/bin/sass-lint.js -c .sass-lint.yml "source/stylesheets/**/*.s+(a|c)ss" -v -q'
  puts 'done.'
end

task :eslint do
  print 'Running eslint... '
  return false unless system './node_modules/eslint/bin/eslint.js -c .eslintrc.json "source/javascripts/core/**/*.js"'
  puts 'done.'
end

task default: %i[sass_lint eslint]
