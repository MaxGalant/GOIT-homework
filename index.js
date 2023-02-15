const argv = require("yargs").argv;
const contacts = require("./contacts");

async function  invokeAction({ action, id, name, email, phone }) {
    switch  (action) {
        case "list":
            const contactsList = await contacts.listContacts()

            console.log('List of contacts:',contactsList)

            break;

        case "get":
            const contactById = await contacts.getContactById(`${id}`)

            if (!contactById){
                console.log(`Contact with id:${id} doesn't exist`)

                break;
            }

            console.log(`The contact with id: ${id}`,contactById)

            break;

        case "add":
            const {newContact,contactsList:listWithNewContact} = await contacts.addContact(name,email,phone)

            console.log(`New contact:`,newContact)

            console.log(`List with a new contact with id:${newContact.id}`,listWithNewContact)

            break;

        case "remove":
            const { removedContact,contactsList: listWithoutContact} = await contacts.removeContact(`${id}`)

            if (!removedContact){
                console.log(`Contact with id:${id} doesn't exist`)

                break;
            }

            console.log(`Removed contact:`,removedContact)

            console.log(`List without contact with id:${id}`,listWithoutContact)
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);