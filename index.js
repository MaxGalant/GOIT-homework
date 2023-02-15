const argv = require("yargs").argv;
const contacts = require("./contacts");

async function  invokeAction({ action, id, name, email, phone }) {
    switch  (action) {
        case "list":
            try {
                const contactsList = await contacts.listContacts()

                console.log('List of contacts:', contactsList)
            }catch (err){
                console.error(err)
            }
            break;

        case "get":
            try {

                const contactById = await contacts.getContactById(`${id}`)

                if (!contactById) {
                    console.log(`Contact with id:${id} doesn't exist`)

                    break;
                }

                console.log(`The contact with id: ${id}`, contactById)
            }catch (err){
                console.error(err)
            }
            break;

        case "add":
            try {
                const {newContact, contactsList: listWithNewContact} = await contacts.addContact(name, email, phone)

                console.log(`New contact:`, newContact)

                console.log(`List with a new contact with id:${newContact.id}`, listWithNewContact)
            }catch (err){
                console.error(err)
            }
            break;

        case "remove":
            try {
                const {removedContact, contactsList: listWithoutContact} = await contacts.removeContact(`${id}`)

                if (!removedContact) {
                    console.log(`Contact with id:${id} doesn't exist`)

                    break;
                }

                console.log(`Removed contact:`, removedContact)

                console.log(`List without contact with id:${id}`, listWithoutContact)
            }catch (err){
                console.log(err)
            }
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);