export interface QuestionInfo {
  questionData: {
    questionId: 1832;
    questionText: null;
    questionDiagramURL: `https://questionkscimagestorage.blob.core.windows.net/dataimages/questionImages/${string}.JPG`;
    answerOption: string;
    fullSolutionURL: `https://questionkscimagestorage.blob.core.windows.net/dataimages/fullsolutionImages/${string}-Solution.JPG`;
    fullSolutionVideoUrl: null;
    fullVideoSolutionUrl: null;
    questionLevelId: 1 | 2;
    questionCode: string;
    chapterId: 72;
    topicId: 18;
    subjectId: 2;
    questionTypeEnumId: QuestionType;
    keywords: null;
    pastYearAppearance: string | null;
    questionScore: number;
    questionVelocity: number;
    averageTimeTakenInSecCorrectQuestions: string;
    q_Latex: string;
    latexStatus: "N";
    explanationVideo: null;
    hintVideo: null;
    solutionVideo: null;
  };
  kscDataList: {
    kscId: number;
    kscCode: string;
    clusterList: null;
    kscText: string;
    kscDiagramURL: `https://questionkscimagestorage.blob.core.windows.net/dataimages/kscImages/${string}.JPG`;
    topic: null;
    subject: null;
    kscClusterName: null;
    kscClusterId: 0;
    createdBy: 0;
    updatedBy: 0;
    courseList: null;
    videoLink: null;
    kscDisplayRank: 0;
    markForRevision: false;
  }[];
  debugData: string;
  explanationVideo: null;
  hintVideo: null;
  solutionVideo: null;
}

export enum QuestionType {
  Objective = 1,
  MultipleChoice = 3,
  Numerical = 4,
}
