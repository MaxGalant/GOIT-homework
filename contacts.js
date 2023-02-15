const fs = require('fs').promises
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json')

const listContacts = async ()=> {
        return fs.readFile(contactsPath,'utf-8')
}

const getContactById = async (contactId) => {
    const contactsData  = await listContacts()

    const contactsList = JSON.parse(contactsData)

    return contactsList.find(contact => contact.id===contactId)
}

const removeContact = async (contactId) => {
    const contactsList  =JSON.parse( await listContacts())

    const contactIndex = contactsList.findIndex(contact => contact.id===contactId)

    if (contactIndex>=0) {
       const removedContact = contactsList.splice(contactIndex, 1)

        await fs.writeFile(contactsPath, JSON.stringify(contactsList,
            null,'\t'))

       return {removedContact, contactsList }
    }
}

const addContact= async (name, email, phone)=> {
    const contactsList =JSON.parse( await listContacts())

    const contactsIds = contactsList.map(contact=>contact.id)

    const contactsMaxId = Math.max(...contactsIds)

    const newContact = {
        id: `${contactsMaxId+1}`,
        name,
        email,
        phone
    }

    contactsList.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(contactsList,
        null,'\t'))

    return {newContact, contactsList }
}


module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
