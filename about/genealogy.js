/**
 * https://code.balkan.app/family-tree-js/first-look#JS
 * https://balkan.app/FamilyTreeJS/Docs/GettingStarted
 * pids: are the partner ids, represents connection between two partners (wife and husband).
 * mid: mother id.
 * fid: father id.
 */

/// <reference path="genealogy.ts" />


function initializeFamilyTree() {
    // Replace this URL with your Google Sheets API URL
    const readSheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/1gaBmikZmaleb0YRvLgbf962ZUv1q2X-lp_zeg50bu5E/values/Sheet1?key=AIzaSyAotgf8upKnjSPvZfxDoAZrAIV5LqTZyOc";
    // Replace this URL with your Google Apps Script web app URL
   // const writeSheetUrl = "https://script.google.com/macros/s/AKfycbwXj9wzU5lYDiNPgrbY9NckjuohMaEiu2eqji9XQBMgLhPIPZ947c028ZlqtWGGGugq/exec";
   const writeSheetUrl = "https://script.google.com/macros/library/d/1HGl3KaypR06OTRCP9HiJh8_m_dSr9RnTmwlK2t06vkBRqf9cA7SozOTe/1"
    fetch(readSheetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var rows = data.values; // your sheet data

            // Transform your rows to the data format needed for FamilyTree
            var transformedData = rows.slice(1).map(row => {
                var obj = {};
            
                if (row[0]) obj.id = parseInt(row[0]);
                if (row[1]) obj.mid = parseInt(row[1]);
                if (row[2]) obj.fid = parseInt(row[2]);
                if (row[3]) obj.pids = row[3].split(',').map(Number);
                if (row[4]) obj.gender = row[4];
                if (row[5]) obj.photo = row[5];
                if (row[6]) obj.name = row[6];
                if (row[7]) obj.born = row[7];
                if (row[8]) obj.died = row[8];
                if (row[9]) obj.city = row[9];
                if (row[10]) obj.state = row[10];
                if (row[11]) obj.country = row[11];
            
                return obj;
            });

            // Initialize the FamilyTree
            var family = new FamilyTree(document.getElementById('tree'), {
                enableSearch: false,
                mouseScrool: FamilyTree.none,
                mode: 'dark',
                template: 'hugo',
                roots: [3],
                nodeTreeMenu: true,
                nodeBinding: {
                    field_0: 'name',
                    field_1: 'born',
                    img_0: 'photo'
                },
                editForm: {
                    titleBinding: "name",
                    photoBinding: "photo",
                    generateElementsFromFields: false,
                    saveAndCloseBtnL: "saveAndClose",
                    buttons:  {
                        share: null,
                        pdf: null
                    },
                    elements: [
                        { type: 'textbox', label: 'Full Name', binding: 'name', vlidators: { required: 'Name Is required' } },
                        [
                            { type: 'date', label: 'Date Of Birth', binding: 'born' },
                            { type: 'date', label: 'Death Of Date', binding: 'deathDate' }
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
                // console.log('sender: ', sender)
                // console.log('args: ', args)
                if (args.name == 'born') {
                    var date = new Date(args.value);
                    args.value = date.toLocaleDateString();
                }
            });

            family.onUpdateNode((args) => {
                if (args.updateNodesData.length > 0) {
                    // Send updated data to Google Sheets
                    const updatedData = args.updateNodesData[0]; // Assuming one update at a time

                    fetch(writeSheetUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedData),
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error:', error));
                }
            });

            // Load the data into the family tree
            console.log('transformedData: ', transformedData)
            family.load(transformedData);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Call initializeFamilyTree when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeFamilyTree);