!function($, ace, marked) {

var editor = ace.edit("mdeditor-source")
editor.setTheme("ace/theme/chrome")
editor.getSession().setMode("ace/mode/markdown")
editor.getSession().setUseWrapMode(true)

// 预览
$('#mdeditor-preview').html(marked(editor.getValue()))

editor.on('change', function() {
	$('#mdeditor-preview').html(marked(editor.getValue()))
})

$.get('data.txt', function(data) {
	editor.setValue(data)
	editor.clearSelection()
	editor.gotoLine(1)
	editor.scrollToLine(0)
	editor.focus()
})

$('#toolbar').on('click', 'button[name]', function(){
	var o = $(this)
	var name = o.attr('name')
	var cmd = cmds[name]
	
	if (typeof cmd === 'function') {
		cmd()
	}
})

function addLine(num) {
	var sel = editor.getSession()
	for (var i = 0; i < num; i++) {
		sel.getDocument().insertNewLine(sel.getCursor())
	}
}

function addText(text) {
	var sel = editor.getSession()
	sel.getDocument().insertInLine(sel.getCursor(), text||'');
}

function selText(from, to) {
	var p = editor.getSelection().getCursor();
	editor.gotoLine(p.row + 1, p.column - from, false);
	editor.getSelection().selectTo(p.row, p.column - to);
}

var cmds = {
	bold: function() {
		var text = editor.session.getTextRange(editor.getSelectionRange())
		console.log(text)
		
		editor.insert('**'+text+'**')
		if (!text) {
			selText(2, 2)
		}
		editor.focus()
	},
	italic: function() {
		var text = editor.session.getTextRange(editor.getSelectionRange())		
		editor.insert('*'+text+'*')
		if (!text) {
			selText(1, 1)
		}
		editor.focus()
	},
	strikethrough: function() {
		var text = editor.session.getTextRange(editor.getSelectionRange())
		
		editor.insert('~~'+text+'~~')
		if (!text) {
			selText(2, 2)
		}
		editor.focus()
	},
	H1: function() {
		var text = editor.session.getTextRange(editor.getSelectionRange())
		var str = text || '一级标题'
		editor.insert('# '+str)
		if (!text) {
			selText(0, str.length)
		}
		editor.focus()
	},
	H2: function() {
		var text = editor.session.getTextRange(editor.getSelectionRange())
		var str = text || '一级标题'
		editor.insert('## '+str)
		if (!text) {
			selText(0, str.length)
		}
		editor.focus()
	},
	H3: function() {
		var text = editor.session.getTextRange(editor.getSelectionRange())
		var str = text || '一级标题'
		editor.insert('### '+str)
		if (!text) {
			selText(0, str.length)
		}
		editor.focus()
	},
	H4: function() {
		var text = editor.session.getTextRange(editor.getSelectionRange())
		var str = text || '一级标题'
		editor.insert('#### '+str)
		if (!text) {
			selText(0, str.length)
		}
		editor.focus()
	},
	ul: function() {
		addLine(2)
		addText('+ ')
		editor.focus()
	},
	ol: function() {
		addLine(2)
		addText('1. ')
		editor.focus()
	},
	code: function() {
		addLine(2)
		addText('```')
		addLine(2)
		addText('```')
		editor.gotoLine(editor.getSelection().getCursor().row, 0, false)
	},
	link: function() {
		var text = editor.session.getTextRange(editor.getSelectionRange())
		
		editor.insert('['+ text +'](http://)')
		if (!text) {
			selText(10, 10)
		} else {
			selText(8, 1)
		}
		editor.focus()
	},
	image: function() {
		
		editor.insert('![图片描述](http://)')
		selText(14, 10)
		editor.focus()
	},
	table: function() {
		
	}
}

}(jQuery, ace, marked)