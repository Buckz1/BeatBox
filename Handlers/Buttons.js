module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Buttons Loaded");
    const buttonsFolder = (await PG((`${process.cwd()}/Buttons/**/*.js`).replace(/\\/g, "/")));

    buttonsFolder.map(async (file) => {
        const buttonFile = require(file);
        if(!buttonFile.id) return;

        client.buttons.set(buttonFile.id, buttonFile);
        Table.addRow(buttonFile.id, "🔴 Working");
        Table.setHeading("CustomId", "Status");
        
    });
    console.log(Table.toString());
};