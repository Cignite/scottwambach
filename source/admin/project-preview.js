var portPreview = createClass({
  render: function() {
    var entry = this.props.entry,
        title = entry.getIn(['data', 'title']),
        url = entry.getIn(['data', 'url']),
        cms = entry.getIn(['data', 'cms']),
        role = entry.getIn(['data', 'role'])
    return h('main', {},
      h('div', {className: 'project-detail preview'},
        h('div', {className: 'wrap'},
          h('div', {className: 'copy'},
            h('div', {className: 'inner'},
              h('h3', {}, title),
              h('p', {},
                h('a', {href: url}, url)
              ),
              h('ul', {},
                h('li', {},
                  h('strong', {}, 'CMS: '),
                  h('span', {}, cms)
                ),
                h('li', {},
                  h('strong', {}, 'Role: '),
                  h('span', {}, role)
                ),
                h('li', {},
                  h('strong', {}, 'I worked with'),
                  h('ul', {},
                    this.props.widgetsFor('collaborators').map(function(collab, index) {
                      return h('a', {},
                        h('li', {}, collab.getIn(['data', 'collaborator'])),
                      )
                    }),
                  ),
                ),
              ),
            ),
          ),
          h('div', {className: 'images'},
            this.props.widgetsFor('screens').map(function(screen, index) {
              return h('a', {},
                h('img', { src: screen.getIn(['data', 'image']) }),
              )
            }),
          ),
        ),
      ),
    );
  }
});

CMS.registerPreviewTemplate('projects', portPreview);
