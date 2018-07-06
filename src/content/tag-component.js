export function initTagInput(tagComponent, tags, allTags, onChange) {
  var tagInput = tagComponent.getElementsByTagName('input')[0],
    currentFocus,
    lowerCaseTags;
  tags = tags || [];

  updateLowerCaseTags();
  removeAllTags();
  tags.forEach(function(tagText) {
    appendTag(tagText);
  });

  tagInput.oninput = function(e) {

    closeAllLists();
    if (tagInput.value) {
      currentFocus = -1;
      var autocompleteList = document.createElement('DIV');
      autocompleteList.setAttribute('id', tagInput.id + 'autocomplete-list');
      autocompleteList.setAttribute('class', 'autocomplete-items');
      tagInput.parentNode.appendChild(autocompleteList);

      for (var i = 0; i < allTags.length; i++) {
        var inputValue = tagInput.value.toLowerCase(),
          tagValue = allTags[i].toLowerCase(),
          tagPieceValue = tagValue.substr(0, inputValue.length);

        if (tagPieceValue === inputValue && lowerCaseTags.indexOf(tagValue) === -1) {
          var matchingElement = document.createElement('DIV');
          matchingElement.innerHTML = '<strong>' + allTags[i].substr(0, tagInput.value.length) + '</strong>';
          matchingElement.innerHTML += allTags[i].substr(tagInput.value.length);
          matchingElement.innerHTML += '<input type="hidden" value="' + allTags[i] + '">';
          matchingElement.addEventListener('click', function(e) {
            appendTag(this.getElementsByTagName('input')[0].value);
            tagInput.value = '';
            closeAllLists();
          });
          autocompleteList.appendChild(matchingElement);
        }
      }
    }
    updateInputSize();
  };

  tagInput.onkeydown = function (e) {
    var autocompleteList = document.getElementById(tagInput.id + 'autocomplete-list');
    if (autocompleteList) {
      autocompleteList = autocompleteList.getElementsByTagName("div");
    }
    switch (e.keyCode) {
      case 40: //down
        currentFocus++;
        addActive(autocompleteList);
        break;
      case 38: //up
        currentFocus--;
        addActive(autocompleteList);
        break;
      case 40:
        break;
      case 13: //enter
        e.preventDefault();
        if (currentFocus > -1) {
          if (autocompleteList) {
            autocompleteList[currentFocus].click();
          }
        } else {
          appendTag(tagInput.value);
        }
        tagInput.value = '';
        onTagsUpdate();
        break;
    }
  };

  tagComponent.onclick = function() {
    tagInput.focus();
  };

  document.addEventListener('click', function (e) {
    closeAllLists(e.target);
  });

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
    updateLowerCaseTags();
    onChange && onChange(tags);
  }

  function updateInputSize() {
    tagInput.size = tagInput.value.length || 1;
  }

  function removeAllTags() {
    var tags = tagComponent.getElementsByClassName('tag');
    while (tags.length) {
      tags[0].parentNode.removeChild(tags[0]);
    }
  }

  function closeAllLists(elmnt) {
    var items = tagComponent.getElementsByClassName('autocomplete-items');
    for (var i = 0; i < items.length; i++) {
      if (elmnt != items[i] && elmnt != tagInput) {
        items[i].parentNode.removeChild(items[i]);
      }
    }
  }

  function addActive(autocompleteList) {
    if (!autocompleteList) {
      return false;
    }
    removeActive(autocompleteList);
    if (currentFocus >= autocompleteList.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = (autocompleteList.length - 1);
    }
    autocompleteList[currentFocus].classList.add('autocomplete-active');
  }

  function removeActive(autocompleteList) {
    for (var i = 0; i < autocompleteList.length; i++) {
      autocompleteList[i].classList.remove('autocomplete-active');
    }
  }

  function updateLowerCaseTags() {
    lowerCaseTags = tags.map(function (tag) {
      return tag.toLowerCase();
    })
  }
}
