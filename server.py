from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from langchain_openai import ChatOpenAI
from langchain_core.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(
    base_url="http://localhost:1234/v1",
    api_key="lm-studio",
    model="qwen/qwen3-vl-4b",
    temperature=0.1,
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()], # 스트림 출력 콜백
)

app = Flask(__name__)
CORS(app)

@app.route("/")
def main_page():
    pass

@app.route("/data/notes")
def send_note_data():
    data_file = open("./datas/note_data.json", "r", encoding="utf-8")
    note_data = json.load(data_file)
    data_file.close()
    return note_data

@app.route("/chat/query")
def send_ai_query():
    user_msg = request.args.get("msg")

    print(user_msg)
    # prompt for LLM
    prompt = ChatPromptTemplate.from_template("{input}")
    chain = prompt | llm | StrOutputParser()
    msg = chain.invoke(str(user_msg))
    return jsonify({"msg": msg})

if __name__ == "__main__":
    app.run(port=8080, debug=True)