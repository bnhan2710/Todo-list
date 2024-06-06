const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

const readData = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('Error reading data:', error);
        return [];
    }
};


const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

yargs(hideBin(process.argv))
    .command({
        command: 'create',
        describe: 'Create a new task',
        builder: {
            title: {
                describe: 'Title of the task',
                demandOption: true,
                type: 'string'
            },
            description: {
                describe: 'Description of the task',
                demandOption: true,
                type: 'string'
            },
            id: {
                describe: 'Id of the task',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (args) => {
            const { title, description, id } = args;
            const tasks = readData();
            tasks.push({ title, description, id });
            writeData(tasks);
            console.log('Task created:', { title, description, id });
        }
    })
    .command({
        command: 'read-all',
        describe: 'Read all tasks',
        handler: () => {
            const tasks = readData();
            console.log('All tasks:', tasks);
        }
    })
    .command({
        command: 'read-detail',
        describe: 'Read task detail',
        builder: {
            id: {
                describe: 'Id of the task',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (args) => {
            const { id } = args;
            const tasks = readData();
            const task = tasks.find(t => t.id === id);
            if (task) {
                console.log('Task details:', task);
            } else {
                console.log(`Task with id ${id} not found.`);
            }
        }
    })
    .command({
        command: 'update',
        describe: 'Update a task',
        builder: {
            id: {
                describe: 'Id of the task',
                demandOption: true,
                type: 'string'
            },
            title: {
                describe: 'Title of the task',
                demandOption: false,
                type: 'string'
            },
            description: {
                describe: 'Description of the task',
                demandOption: false,
                type: 'string'
            }
        },
        handler: (args) => {
            const { id, title, description } = args;
            const tasks = readData();
            const taskIndex = tasks.findIndex(t => t.id === id);
            if (taskIndex !== -1) {
                if (title) tasks[taskIndex].title = title;
                if (description) tasks[taskIndex].description = description;
                writeData(tasks);
                console.log('Task updated:', tasks[taskIndex]);
            } else {
                console.log(`Task with id ${id} not found.`);
            }
        }
    })
    .command({
        command: 'delete',
        describe: 'Delete a task',
        builder: {
            id: {
                describe: 'Id of the task',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (args) => {
            const { id } = args;
            const tasks = readData();
            const taskIndex = tasks.findIndex(t => t.id === id);
            if (taskIndex != -1){
                tasks.splice(taskIndex,1);
                writeData(tasks);
                console.log("Delete task with id:",id)
            }
            else{
                console.log("Can not find task with id:",id)
            }
        }
    })
    .parse();
