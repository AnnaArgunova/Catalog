const structure = [{
    'folder': true,
    'title': 'Films',
    'children': [{
        'title': 'Iron Man.avi'
      },
      {
        'folder': true,
        'title': 'Fantasy',
        'children': [{
            'title': 'The Lord of the Rings.avi'
          },
          {
            'folder': true,
            'title': 'New folder 1',
            'children': false
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Documents',
    'children': [{
      'folder': true,
      'title': 'EPAM Homework answers',
      'children': null
    }]
  }
];

const rootNode = document.getElementById('root');

function tree(structure, parent) {
  if (structure === null || !structure) {
    let element = document.createElement('p');
    element.className = 'text';
    element.innerText = 'Folder is empty';
    if(parent.getAttribute('class').includes('folder')){
    parent.appendChild(element);
    }
  } else {
    for (let i = 0; i < structure.length; i++) {
      let element;
      if (structure[i].folder) {
        element = document.createElement('div');
        element.className = 'folder';
        element.classList.add('clouse');
        structure[i].isOpen = false;
      } else if (!structure[i].folder) {
        element = document.createElement('div');
        element.className = 'file';
      }
      element.innerHTML = structure[i].title;
      parent.appendChild(element);

      element.addEventListener('mouseover', function () {
        event.stopPropagation();
        element.style.backgroundColor = '#efefef';
      });
      element.addEventListener('mouseout', function () {
        event.stopPropagation();
        element.style.backgroundColor = 'transparent';
      })

      element.addEventListener('click', function () {
        event.stopPropagation();

        if (!structure[i].isOpen) {
          tree(structure[i].children, event.target);
          structure[i].isOpen = true;
          element.classList.add('open');
          element.classList.remove('clouse');
        } else {
          structure[i].isOpen = false;
          element.classList.add('clouse');
          element.classList.remove('open');

          while (element.firstChild) {

            element.removeChild(element.lastChild);

          }
          element.innerHTML = structure[i].title;
        }

      });
    }
  }
}

tree(structure, rootNode);