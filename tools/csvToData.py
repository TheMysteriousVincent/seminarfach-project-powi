#!/usr/bin/env python3

import sys, csv, json

def main():
	filePath = sys.argv[1]
	if filePath == "":
		return 1

	jsonOutPath = sys.argv[2]
	if jsonOutPath == "":
		return 1

	jsonData = {'categories': []}
	with open(filePath, newline='', encoding="utf-8") as csvfile:
		reader = csv.reader(csvfile, delimiter=',', quotechar='"')
		categories = []
		next(reader, None)
		for row in reader:
			if row[0] != "":
				if not (row[0] in categories):
					amount = 0
					if row[3] != "":
						amount += 1

					if row[4] != "":
						amount += 1

					if row[5] != "":
						amount += 1

					if amount > 1:
						categories.append(row[0])

					print("adding category ", row[0])

		for category in categories:
			print("fetching questions for category ", category)
			questions = []
			csvfile.seek(0)
			next(reader, None)
			for row in reader:
				if row[0] == category:
					answers = []
					if row[3] != "":
						answers.append(row[3])

					if row[4] != "":
						answers.append(row[4])

					if row[5] != "":
						answers.append(row[5])

					if len(answers) > 1:
						correctStrAnswers = str.split(row[9], ",")
						correctAnswers = []
						for correctAnswerStr in correctStrAnswers:
							correctAnswers.append(int(correctAnswerStr))
						print("adding question ", row[1])
						questions.append({
							'title': row[2],
							'answers': answers,
							'correct_answers': correctAnswers
						})
			jsonData["categories"].append({
				'title': category,
				'questions': questions
			})
	jsonOut = open(jsonOutPath, 'w')
	jsonOut.write(json.dumps(jsonData))
	jsonOut.close()

if __name__ == '__main__':
    sys.exit(main())
