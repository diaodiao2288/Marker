const fs = require('fs');
const reload = require('./reload').reload;

const fileUtil = {
	read: (args) => {
		var index = args['index'];
		var path = args['path'];
		var buffer = fs.readFileSync(path);
		var editor = $('.editor');
		//创建新的textarea
		if (index != 0) {
			var newEditor = $("<textarea></textarea>").val(buffer.toString());
			var newPreview = $("<div></div>");
			newPreview.addClass("preview");
			newEditor.addClass("editor");
			newEditor.attr("autofocus", "autofocus");
			addContent(index, newEditor, newPreview);
		}
		//替换当前的textarea
		else {
			$('.editor').eq(0).val(buffer.toString());
		}
		reload(index);
	},
	save: (args) => {
		var index = args['index'];
		var path = args['path'];
		fs.writeFile(path, $('.preview').eq(index).text().toString(), (err) => {
			if (err) throw err;
			console.log('save success!');
		});
	},
	newFile: (args) => {
		var index = args['index'];
		if (index != 0) {
			var newEditor = $("<textarea></textarea>");
			var newPreview = $("<div></div>");
			newPreview.addClass("preview");
			newEditor.addClass("editor");
			newEditor.attr("autofocus", "autofocus");
			addContent(index, newEditor, newPreview);
		}
	}
}

addContent = (index, newEditor, newPreview) => {
  	$('.editor').eq(index-1).after(newEditor);
	$('.editor').hide();
	$('.editor').eq(index).show();
	$('.preview').eq(index-1).after(newPreview);
	$('.preview').hide();
	$('.preview').eq(index).show();
}

exports.fileUtil = fileUtil;
