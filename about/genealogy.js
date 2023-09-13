/**
 * https://code.balkan.app/family-tree-js/first-look#JS
 * https://balkan.app/FamilyTreeJS/Docs/GettingStarted
 * pids: are the partner ids, represents connection between two partners (wife and husband).
 * mid: mother id.
 * fid: father id.
 */

/// <reference path="genealogy.ts" />


function initializeFamilyTree() {
     // Replace this URL with your Google Apps Script web app URL
   const spreadSheetUrl = "https://script.google.com/macros/s/AKfycbxBben256dli_WFR8tJfthpwuyNCr1bw9I4GNmWtVuFtJObzUq-CUrhscESGG6HHVmE/exec"
    fetch(spreadSheetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var transformedData = [];
            for(var i=1; i < data.length; i++){
                // console.log(data[i]);
                var obj = {};
                if (data[i][0]) obj.id = parseInt(data[i][0]);
                if (data[i][1]) obj.mid = parseInt(data[i][1]);
                if (data[i][2]) obj.fid = parseInt(data[i][2]);
                if (data[i][3]) obj.pids = [data[i][3]];
                if (data[i][4]) obj.gender = data[i][4];
                if (data[i][5]) obj.photo = data[i][5];
                if (data[i][6]) obj.name = data[i][6];
                if (data[i][7]){
                    var date = new Date(Date.parse(data[i][7]));
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    let addZero = (el) => ((el.toString().length == 1) ? '0' : '') + el.toString();
                    var test =  year + "-" + addZero(month) + "-" +  addZero(day)
                    obj.born = test;
                } 
                if (data[i][8]) obj.died = data[i][8];
                if (data[i][9]) obj.city = data[i][9];
                if (data[i][10]) obj.state = data[i][10];
                if (data[i][11]) obj.country = data[i][11];

                transformedData.push(obj);
            }
            // console.log('transformedData: ', transformedData)

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
                        { type: 'textbox', label: 'Name', binding: 'name', vlidators: { required: 'Name Is required' } },
                        [
                            { type: 'date', label: 'Date of Birth', binding: 'born' },
                            { type: 'date', label: 'Date of Death', binding: 'died' }
                        ],
                        [
                            { type: 'textbox', label: 'City (born)', binding: 'city' },
                            { type: 'textbox', label: 'State (born)', binding: 'state' },
                            { type: 'select', options: [ { value: 'by', text: 'Belarus' }, { value: 'ru', text: 'Russia' }, { value: 'usa', text: 'USA' }], label: 'Country (born)', binding: 'country' },
                        ],
                        { type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' },
                    ]
                },
            });

            family.on('field', function (sender, args) {
                if (args.name == 'born') {
                    var date = new Date(Date.parse(args.value));
                    args.value = date.toLocaleDateString();

                    var date = new Date(Date.parse(args.value));
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate() + 1;
                    let addZero = (el) => ((el.toString().length == 1) ? '0' : '') + el.toString();   
                    var test = addZero(month) + "/" +  addZero(day) + "/" + year;
                    args.value = test;
                }
            });

            family.onUpdateNode((args) => {
                try{
                    if (args.updateNodesData.length > 0) {
                        // Send updated data to Google Sheets
                        const updatedData = args.updateNodesData[0]; // Assuming one update at a time
                        // console.log('updatedData: ', updatedData);
                        const formData = new FormData();
                        formData.append("mid", updatedData.mid);
                        formData.append("fid", updatedData.fid);
                        formData.append("pids", updatedData.pids);
                        formData.append("gender", updatedData.gender);
                        formData.append("photo", updatedData.photo);
                        formData.append("name", updatedData.name);
                        formData.append("born", updatedData.born);
                        formData.append("died", updatedData.deathDate);
                        formData.append("city", updatedData.city);
                        formData.append("state", updatedData.state);
                        formData.append("country", updatedData.country);
                        fetch(spreadSheetUrl, {
                            method: 'POST',
                            body: formData,
                        })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.error('Error:', error));
                    }

                } catch (e) {
                    console.log('Errors:', e.message)
                  }
                
            });

            // Load the data into the family tree
            // console.log('transformedData: ', transformedData)
            family.load(transformedData);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Call initializeFamilyTree when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeFamilyTree);