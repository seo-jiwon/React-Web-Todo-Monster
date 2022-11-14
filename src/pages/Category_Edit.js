import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { purple } from "@mui/material/colors";
import "../css/Category.css";

const categoryModalStyles = {
  content: {
    width: "70%",
    height: "40%",
    marginTop: "70%",
    marginLeft: "8%",
  },
};

function Category_Edit() {
  const navigate = useNavigate();
  const location = useLocation();

  //해당 카테고리 아이디
  const cateId = location.state.cate_id;
  const cateName = location.state.cate_name;
  const catePrivacy = location.state.cate_privacy;
  console.log(cateId);
  console.log(cateName);
  console.log(catePrivacy);

  //카테고리명 입력값
  const [categoryName, setCategoryName] = useState("");
  //입력 칸 공백 검사
  const [isCategoryName, setIsCategoryName] = useState(false);
  //공개설정 값
  const [privacy, setPrivacy] = useState("선택 ▼");
  //공개설정 선택 검사
  const [isPrivacy, setIsPrivacy] = useState(false);
  //모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  //입력 칸 공백 검사
  const checkCategoryName = (e) => {
    const categoryNameCurrent = e.target.value;
    setCategoryName(categoryNameCurrent);

    if (categoryNameCurrent.length > 0) {
      setIsCategoryName(true);
    } else {
      setIsCategoryName(false);
    }
  };

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);

    //공개설정 선택 검사
    if (privacy == "선택 ▼") {
      setIsPrivacy(false);
    } else {
      setIsPrivacy(true);
    }
  }

  const privacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  return (
    <div id="container">
      <div id="AppBar">
        <button
          id="backBtn"
          onClick={() => {
            navigate("/category");
          }}
        >
          {"<"}
        </button>
        <div id="pageTitle">카테고리 수정</div>
        <button
          id="c_checkBtn"
          disabled={!isCategoryName}
          onClick={() => {
            navigate("/category");
          }}
        >
          확인
        </button>
      </div>

      <div id="categoryForm">
        <input
          id="category_add"
          placeholder="카테고리명 입력"
          value={categoryName}
          onChange={checkCategoryName}
        ></input>
        <div id="category_line"></div>
      </div>

      <div id="privacyForm">
        <p id="privacy">공개설정</p>
        <button id="privacy_edit" onClick={openModal}>
          {privacy}
        </button>
        <div id="c_line"></div>

        <Modal
          style={categoryModalStyles}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          <div id="modal">
            <div id="modalTitle">공개설정</div>

            <FormControl id="modalFormControl">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={privacyChange}
              >
                <div id="modalPrivacyForm">
                  <FormControlLabel
                    id="modalPrivacy"
                    value="나만보기"
                    control={
                      <Radio
                        sx={{
                          color: purple[800],
                          "&.Mui-checked": {
                            color: purple[600],
                          },
                        }}
                      />
                    }
                    label="나만보기"
                  />
                  <div id="modalLine"></div>
                </div>
                <div id="modalPrivacyForm">
                  <FormControlLabel
                    id="modalPrivacy"
                    value="일부공개"
                    control={
                      <Radio
                        sx={{
                          color: purple[800],
                          "&.Mui-checked": {
                            color: purple[600],
                          },
                        }}
                      />
                    }
                    label="일부공개"
                  />
                  <div id="modalLine"></div>
                </div>
                <div id="modalPrivacyForm">
                  <FormControlLabel
                    id="modalPrivacy"
                    value="전체공개"
                    control={
                      <Radio
                        sx={{
                          color: purple[800],
                          "&.Mui-checked": {
                            color: purple[600],
                          },
                        }}
                      />
                    }
                    label="전체공개"
                  />
                  <div id="modalLine"></div>
                </div>
              </RadioGroup>
            </FormControl>

            <button id="modalCheckBtn" onClick={closeModal}>
              확인
            </button>
          </div>
        </Modal>
      </div>

      <button
        id="delBtn"
        onClick={() => {
          alert("이 카테고리를 삭제하시겠습니까?");
        }}
      >
        삭제
      </button>
    </div>
  );
}

export default Category_Edit;
