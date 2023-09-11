//JavaScript

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


family.load(
    [
        // { id: 10, mid: 4, fid: 5, name: "Anastasia Paletykina-Cantu", gender: "female", born: "02/14/1983", photo: "../assets/images/genealogy/nastya.jpg" },
        // { id: 11, mid: 6, fid: 7, name: "Sheena Gates", gender: "female", born: "07/04/1982", photo: "../assets/images/genealogy/sheena.jpg" },
        // { id: 6, pids: [7,8], name: "Cindy Walther", gender: "female", born: "09/27/1962", photo: "../assets/images/genealogy/cindy.jpg" },
        // { id: 8, pids: [6], name: "Gary Walther", gender: "male", born: "07/07/????", photo: "../assets/images/genealogy/gary.jpg" },
        // { id: 9, pids: [7], name: "Deanna Gates", gender: "female", born: "07/07/1960", photo: "../assets/images/genealogy/deanna.jpg" },
    
        { id: 1, pids: [3], gender: 'male', photo: 'https://cdn.balkan.app/shared/m60/2.jpg', name: 'Zeph Daniels', born: '1954-09-29' },
        { id: 2, pids: [3], gender: 'male', photo: '../assets/images/genealogy/andrei.jpg', name: 'Andrei Paletykin', born: '1960-02-11' },
        { id: 3, pids: [2], gender: 'female', photo: '../assets/images/genealogy/larisa.jpg', name: 'Larisa Paletykina', born: '1962-12-26', city: 'Moscow', country: 'ru' },
        { id: 4, pids: [5], photo: '../assets/images/genealogy/michael.jpg', name: 'Michael Gates', born: '1960-02-22' },
        { id: 5, pids: [4], gender: 'female', photo: '../assets/images/genealogy/cindy.jpg', name: 'Cindy Walther', born: '1963-10-27' },
        { id: 6, mid: 2, fid: 3, pids: [7], gender: 'female', photo: '../assets/images/genealogy/katya.jpg', name: 'Katerina Gates', born: '1990-10-16' },
        { id: 7, pids: [6], mid: 5, fid: 4, gender: 'male', photo: '../assets/images/genealogy/steven.jpg', name: 'Steven Gates', born: '1985-07-01' },
        { id: 8, mid: 7, fid: 6, gender: 'female', photo: '../assets/images/genealogy/me.jpg', name: 'Me', born: '2023-05-30' }
    ]
);
