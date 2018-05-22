export function initTagInput(tagComponent, tags, onChange) {
  var tagInput = tagComponent.getElementsByTagName('input')[0];
  tags = tags || [];

  tags.forEach(function(tagText) {
    appendTag(tagText);
  });

  tagInput.onkeyup = function(e) {
    if (e.which === 13 && tagInput.value) {
      appendTag(tagInput.value);
      tagInput.value = '';
      onTagsUpdate();
    }
    updateInputSize();
  };

  tagComponent.onclick = function() {
    tagInput.focus();
  };

  updateInputSize();

  function appendTag(tagText) {
    var removeBtn = document.createElement('span');
    removeBtn.className = 'remove-tag';
    removeBtn.onclick = function() {
      this.parentElement.parentElement.removeChild(this.parentElement);
      onTagsUpdate();
    };

    var newTag = document.createElement('span');
    newTag.className = 'tag';
    newTag.innerHTML = tagText;
    newTag.appendChild(removeBtn);
    tagComponent.insertBefore(newTag, tagInput);
  }

  function onTagsUpdate() {
    tags = [].slice.call(tagComponent.getElementsByClassName('tag')).map(function(tagElement) {
      return tagElement.textContent;
    });
    onChange && onChange(tags);
  }

  function updateInputSize() {
    tagInput.size = tagInput.value.length || 1;
  }
}
