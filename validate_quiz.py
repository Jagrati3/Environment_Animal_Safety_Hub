import json

def validate_quiz_data():
    try:
        with open('frontend/assets/data/quiz-data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

        print("JSON is valid!")

        quizzes = data.get('quizzes', [])
        print(f"\nFound {len(quizzes)} quizzes:")

        for quiz in quizzes:
            quiz_id = quiz.get('id', 'Unknown')
            has_progress_key = 'progressKey' in quiz
            progress_key = quiz.get('progressKey', 'MISSING')

            status = "OK" if has_progress_key else "MISSING progressKey"
            print(f"{quiz_id}: {status} (progressKey: {progress_key})")

        # Check if all have progressKey
        all_have_key = all('progressKey' in q for q in quizzes)
        print(f"\nAll quizzes have progressKey: {all_have_key}")

    except FileNotFoundError:
        print("Error: quiz-data.json file not found")
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON - {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    validate_quiz_data()
