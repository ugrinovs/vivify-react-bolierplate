export function extractFirstErrorEachField(fields) {
	if (typeof fields === 'string') {
		return fields;
	}

	const keysArr = Object.keys(fields);
	return keysArr.reduce((acc, curr) => {
		return {
			...acc,
			[curr]: fields[curr][0],
		};
	}, {});
}
