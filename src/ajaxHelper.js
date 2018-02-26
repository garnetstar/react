class AjaxHelperClass {

	gymList(callback, typeId) {
		fetch('/gym?type=1&order=desc&type=' + typeId)
			.then(res => res.json())
			.then((result) => {
				if(result.ok === false) {
					this.setState({
						loadIemsError: result.status + ' ' + result.statusText,
					});
				} else {
					callback(result, typeId);
				}
			});
	}

	gymSave(date, value, typeId, callback) {
		const body = JSON.stringify({
			date: date,
			value: value,
			type: typeId
		});
		fetch('/gym', {
			method: 'POST',
			body: body
		})
		.then(res=>{callback(res)})
		.catch(res=>{console.log(res);});
	}

}

export default new AjaxHelperClass;
