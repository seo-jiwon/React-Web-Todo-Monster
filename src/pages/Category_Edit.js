import { React, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
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
  const cateId = location.state.cate_id.cateId;
  const cateName = location.state.cate_name.cateName;
  const catePrivacy = location.state.cate_privacy.catePrivacy;

  //카테고리명 입력값
  const [categoryName, setCategoryName] = useState(cateName);
  //입력 칸 공백 검사
  const [isCategoryName, setIsCategoryName] = useState(false);
  //공개설정 값
  const [privacy, setPrivacy] = useState(catePrivacy);
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
  }

  const privacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  
  //서버 전송
  const CategoryEditForm = useCallback((e) => {
    e.preventDefault();

    const data = {
      cateId: cateId,
      categoryName: e.target.categoryName.value,
      privacy: e.target.privacy.value,
    };
    console.log(data);

    axios
      .post("/category/categoryEdit", data)
      .then(function (response) {
        if (response.data.success) {
          navigate("/category");
        }
      })
      .catch(function (error) {
        alert("카테고리 수정 에러: " + error);
      });
  }, []);

  return (
    <div id="container">
      <form onSubmit={CategoryEditForm}>
        <div id="AppBar">
          <button
            id="backBtn"
            type="button"
            onClick={() => {
              navigate("/category");
            }}
          >
            {"<"}
          </button>
          <div id="pageTitle">카테고리 수정</div>
          <button
            id="c_checkBtn"
            type="submit"
            disabled={!isCategoryName}
          >
            확인
          </button>
        </div>

        <div id="categoryForm">
          <input
            id="category_add"
            name="categoryName"
            placeholder="카테고리명 입력"
            value={categoryName}
            onChange={checkCategoryName}
          ></input>
          <div id="category_line"></div>
        </div>

        <div id="privacyForm">
          <p id="privacy">공개설정</p>
          <button
            id="privacy_edit"
            name="privacy"
            type="button"
            onClick={openModal}
            value={privacy}
          >
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

              <button id="modalCheckBtn" type="button" onClick={closeModal}>
                확인
              </button>
            </div>
          </Modal>
        </div>

        <button
          id="delBtn"
          type="button"
          onClick={() => {
            alert("이 카테고리를 삭제하시겠습니까?");
          }}
        >
          삭제
        </button>
      </form>
    </div>
  );
}

export default Category_Edit;
