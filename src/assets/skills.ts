import { skillsIcons } from "./index";
import { skillCategories, skillSubcategories } from "./constants";
import {
  Skill,
  AvailableSkillCategories,
  AvailableSkillSubcategories,
} from "./dataTypes";

/** All the skill to display and their related information. */
export const skills: Array<Skill> = [
  {
    label: "YOLO",
    icon: skillsIcons.yolo_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.yolo.software/'
  },
  {
    label: "OpenCV",
    icon: skillsIcons.opencv_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://opencv.org/',
    weight: 9
  },
  {
    label: "Terraform",
    icon: skillsIcons.terraform_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.terraform.io/'
  },
  {
    label: "React",
    icon: skillsIcons.react_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    framework: "Javascript",
    link: 'https://react.dev/',
    weight: 8
  },
  {
    label: "Typescript",
    icon: skillsIcons.typescript_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    framework: "Javascript",
    link: 'https://www.typescriptlang.org/',
    weight: 8
  },
  {
    label: "Python",
    icon: skillsIcons.python_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    link: "https://www.python.org/",
    weight: 9
  },
  {
    label: "Java",
    icon: skillsIcons.java_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    link: 'https://www.java.com/',
    weight: 8
  },
  {
    label: "VSCode",
    icon: skillsIcons.vscode_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://code.visualstudio.com/',
    weight: 8
  },
  {
    label: "Docker",
    icon: skillsIcons.docker_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.docker.com/'
  },
  {
    label: "Git",
    icon: skillsIcons.git_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://git-scm.com/',
    weight: 9
  },
  {
    label: "GnuPG",
    icon: skillsIcons.gnupg_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://www.gnupg.org/'
  },
  {
    label: "Tailwind",
    icon: skillsIcons.tailwind_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    link: 'https://tailwindcss.com/'
  },
  {
    label: "Markdown",
    icon: skillsIcons.markdown_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.FORMATING)!,
    link: 'https://www.markdownguide.org/'
  },
  {
    label: "SQL",
    icon: skillsIcons.sql_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.DATABASE)!,
    link: 'https://fr.wikipedia.org/wiki/Structured_Query_Language'
  },
  {
    label: "Pandas",
    icon: skillsIcons.pandas_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.BIGDATA)!,
    link: 'https://pandas.pydata.org/'
  },
  {
    label: "Numpy",
    icon: skillsIcons.numpy_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.BIGDATA)!,
    link: 'https://numpy.org/'
  },
  {
    label: "Symfony",
    icon: skillsIcons.symfony_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    framework: "PHP",
    link: 'https://symfony.com/'
  },
  {
    label: "PHP",
    icon: skillsIcons.php_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    link: 'https://www.php.net/'
  },
  {
    label: "Debian",
    icon: skillsIcons.debian_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.debian.org/'
  },
  {
    label: "Rust",
    icon: skillsIcons.rust_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    link: 'https://www.rust-lang.org/'
  },
  {
    label: "Latex",
    icon: skillsIcons.latex_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.FORMATING)!,
    link: 'https://www.latex-project.org/'
  },
  {
    label: "MySQL",
    icon: skillsIcons.mysql_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.mysql.com/'
  },
  {
    label: "Bash",
    icon: skillsIcons.bash_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    link: 'https://www.gnu.org/software/bash/'
  },
  {
    label: ".NET",
    icon: skillsIcons.dotnet_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    framework: "C#",
    link: 'https://dotnet.microsoft.com/'
  },
  {
    label: "Javascript",
    icon: skillsIcons.js_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript'
  },
  {
    label: "C",
    icon: skillsIcons.c_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    link: 'https://fr.wikipedia.org/wiki/C_(langage)'
  },
  {
    label: "Cpp",
    icon: skillsIcons.cplusplus_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    framework: "C",
    link: 'https://fr.wikipedia.org/wiki/C%2B%2B'
  },
  {
    label: "Figma",
    icon: skillsIcons.figma_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.figma.com/'
  },
  {
    label: "Go",
    icon: skillsIcons.go_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    link: 'https://golang.org/'
  },
  {
    label: "C#",
    icon: skillsIcons.csharp_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    framework: "C",
    link: 'https://docs.microsoft.com/fr-fr/dotnet/csharp/'
  },
  {
    label: "CustomTK",
    icon: skillsIcons.customtkinter_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://github.com/TomSchimansky/CustomTkinter'
  },
  {
    label: "Matplotlib",
    icon: skillsIcons.matplotlib_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://matplotlib.org/'
  },
  {
    label: "CUDA",
    icon: skillsIcons.cuda_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://developer.nvidia.com/cuda-toolkit'
  },
  {
    label: "PyTorch",
    icon: skillsIcons.pytorch_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://pytorch.org/'
  }, 
  {
    label: "Transformers",
    icon: skillsIcons.hugging_face_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://huggingface.co/docs/transformers/index'
  },
  {
    label: "HuggingFace",
    icon: skillsIcons.hugging_face_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://huggingface.co'
  },
  {
    label: "JUnit",
    icon: skillsIcons.junit_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://junit.org/junit5/'
  },
  {
    label: "SQL Server",
    icon: skillsIcons.sqlserver_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://docs.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver15'
  },
  {
    label: "Twig",
    icon: skillsIcons.twig_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://twig.symfony.com/doc/3.x/'
  },
  {
    label: "PL/SQL",
    icon: skillsIcons.sql_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://www.oracle.com/database/technologies/appdev/plsql.html'
  },
  {
    label: "Axios",
    icon: skillsIcons.axios_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://axios-http.com/docs/intro'
  },
  {
    label: "PyTest",
    icon: skillsIcons.unittest_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://docs.python.org/3/library/unittest.html'
  }
];
