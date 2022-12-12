import initSqlJS, {Database, QueryExecResult} from 'sql.js';

// This is such a bad idea. Be better to use something like lambda with an rds database
export namespace DBInterface {
	let db: Database | undefined;
	
	export async function getDB(): Promise<Database> {
		if (db === undefined) {
			const SQL = await initSqlJS({
				locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
			});
			const dbFile = await fetch('volunfind.db');
			db = new SQL.Database(new Uint8Array(await dbFile.arrayBuffer()));
		}
		return db;
	}
	
	export function convertRowsToObjects(rows: QueryExecResult): {[key: string]: any}[] {
		return rows.values.map(row => Object.fromEntries(row.map((val, idx) => [rows.columns[idx], val])));
	}
}