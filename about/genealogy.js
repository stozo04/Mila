/** 
 * https://code.balkan.app/family-tree-js/first-look#JS
 * https://balkan.app/FamilyTreeJS/Docs/GettingStarted
 * pids: are the partner ids, represents connection between two partners (wife and husband).
 * mid: mother id.
 * fid: father id.
 */



function initializeFamilyTree() {
    fetch('./genealogy.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Initialize the FamilyTree
            var family = new FamilyTree(document.getElementById('tree'), {
                mouseScrool: FamilyTree.none,
                mode: 'dark',
                template: 'hugo',
                roots: [3],
                nodeMenu: {
                    edit: { text: 'Edit' },
                    details: { text: 'Details' },
                },
                nodeTreeMenu: true,
                nodeBinding: {
                    field_0: 'name',
                    field_1: 'born',
                    img_0: 'photo'
                },
                editForm: {
                    titleBinding: "name",
                    photoBinding: "photo",
                    addMoreBtn: 'Add element',
                    addMore: 'Add more elements',
                    addMoreFieldName: 'Element name',
                    generateElementsFromFields: false,
                    elements: [
                        { type: 'textbox', label: 'Full Name', binding: 'name' },
                        [
                            { type: 'date', label: 'Date Of Birth', binding: 'born' }
                        ],
                        [
                            { type: 'select', options: [{ value: 'bg', text: 'Bulgaria' }, { value: 'ru', text: 'Russia' }, { value: 'gr', text: 'Greece' }], label: 'Country', binding: 'country' },
                            { type: 'textbox', label: 'City', binding: 'city' },
                        ],
                        { type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' },
                    ]
                },
            });
            
            family.on('field', function (sender, args) {
                if (args.name == 'born') {
                    var date = new Date(args.value);
                    args.value = date.toLocaleDateString();
                }
            });

            // Load the data into the family tree
            family.load(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Call initializeFamilyTree when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeFamilyTree);