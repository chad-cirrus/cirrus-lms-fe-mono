#Main Questions for 30817

**Scorm slide/step:** key: *cmi.interactions.undefined.id  --- value: Scene1_Slide2_MultiChoice_1_0*

**Users answer to the question:** *key: cmi.interactions.undefined.student_response  --- value:* British_Specification_DTD_406-B

**Answer is correct or incorrect:** *key: cmi.interactions.undefined.result  --- value: correct*

**If its a quiz then the question and question number:** *nothing immediately, but after the first question is answered then you get scores and you get the result and response keys. But you only get the scores keys if the answer is correct.*

## Notes
Everytime the user answers a question scorm produces a 'suspend' data string and the js api adds it to the data object.

If the answer is correct the following three values are created and added to the data object.

- cmi.core.score.raw
- cmi.core.score.max
- cmi.core.score.min

for example after you answer one question correct in a four question series, you have a min of 0, a max of 100 and a raw of 25.

cmi.interactions.undefined.result

also with each question answered a suspend.data object is generated.

What the api doesn't do is tell you how many questions are in the quiz and how many questions have been answered.

You can count how many questions are answered with a result key. You can derive total questions with first max value.



