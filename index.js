#!/usr/bin/env node


SC.initialize({
	client_id: "fa791b761f68cafa375ab5f7ea51927a", // FIXME
	// redirect_uri: "http://jsfiddle.net/iambnz/LH3E4/",
});


const PAGE_SIZE = 200;
// permalink to a track
const TRACK_URL = 'https://soundcloud.com/droidbishop/the-outlander';


function writeComments(comments) {
	comments.sort((a, b) => (a.timestamp - b.timestamp))
	for (let c of comments) {
		$('#result').append(`
						${c.timestamp}
			<br />${c.created_at}
			<br />${c.body}
			<br /><br />
		`)
	}
}


SC.get('/resolve', {url: TRACK_URL}, (track) => {
  SC.get(`/tracks/${track.id}/comments`, {limit: PAGE_SIZE,                  }, writeComments);
  SC.get(`/tracks/${track.id}/comments`, {limit: PAGE_SIZE, offset: PAGE_SIZE}, writeComments);  
});
