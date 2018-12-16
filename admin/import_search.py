from config import Config
import mysql.connector
from es import ES
import re
import json
import sys
reload(sys)
sys.setdefaultencoding('utf8')

class PhotoshareIndex:
    def __init__(self, db, es):
        self.db = db
        self.es = es

    def start(self):
        cursor = self.db.cursor();
        cursor.execute("SELECT id, CONCAT(firstName, ' ', lastName), avatar, email FROM Users")
        result = cursor.fetchall()
        for r in result:
            id, name, avatar, email = r
            username = re.split(r'[@.]', email)[0]
            self.es.index_es(json.dumps({"id": id, "name": name.strip(), "avatar": avatar, "username": username}))
        print("Completed index to elastic search")


if __name__ == "__main__":
    source_db = mysql.connector.connect(
        host=Config.dbserver,
        user=Config.username,
        passwd=Config.password,
        database=Config.db
    )

    es = ES(Config.es_server, Config.es_port, "photoshare_users", "users")

    index = PhotoshareIndex(source_db, es)
    index.start()
