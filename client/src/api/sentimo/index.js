class SentimoSocket extends EventTarget {
	constructor() {
		super();
		this.socket = new WebSocket(`ws://${window.location.hostname}:8080`);

		this.socket.onopen = event => {
            console.info('Socket connected successfully');
        }

        this.socket.onmessage = event => {
        	let data;
        	try {
        		data = JSON.parse(event.data);
        	} catch(e) {
        		data = event.data;
        	}
        	console.log('message received:', data);
        	this.emit(data);
        }

        this.socket.onclose = event => {
        	console.log("That's yer socket deid");
        }
	}

	emit(data) {
        const emission = new CustomEvent(data.action, { detail: { data }});
        this.dispatchEvent(emission);
    }

	on(action, callback) {
		this.addEventListener(action, event => callback(event.detail.data));
	}

	send(action, value) {
		console.log(`Value is ${value}`);
		this.socket.send(JSON.stringify({
			action,
			value
		}));
	}
}

const sentimo = new SentimoSocket();
export default sentimo;