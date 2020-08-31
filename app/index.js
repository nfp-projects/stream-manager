/**
 * @license
 * stream-manager <https://filadelfia.is>
 * Copyright 2015 Jonatan Nilsson <http://jonatan.nilsson.is/>
 *
 * Available under WTFPL License (http://www.wtfpl.net/txt/copying/)
*/

'use strict'

//Add debug components to window. Allows us to play with controls
//in the console. 
window.components = {}

require('./socket')

const m = require('mithril')
const Header = require('./header')

const Frontpage = require('./frontpage/frontpage')
// const Add = require('./add/module')
// const Graphic = require('./graphics/module')
// const Dagskra = require('./dagskra/module')

m.mount(document.getElementById('header'), Header)

m.route(document.getElementById('content'), '/', {
    '/': Frontpage,
    // '/add': Add,
    // '/graphics': Graphic,
    // '/graphics/:id': Graphic,
})
