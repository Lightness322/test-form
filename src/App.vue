<script>
import { required } from "vuelidate/lib/validators"

export default {
  data() {
    return {
      contentData: {
        clientGroups: [
          { name: "VIP" },
          { name: "Проблемные" },
          { name: "ОМС" },
        ],
        doctors: [
          { name: "Иванов" },
          { name: "Захаров" },
          { name: "Чернышева" },
        ],
        documentTypes: [
          { name: "Паспорт" },
          { name: "Свидетельство о рождении" },
          { name: "Вод. удостоверение" },
        ],
      },
      userForm: {
        name: "",
        surname: "",
        patronymic: "",
        birthday: "",
        phoneNumber: "",
        gender: "male",
        clientGroup: [],
        doctor: "",
        isSendMessage: false,
        index: "",
        country: "",
        region: "",
        city: "",
        street: "",
        house: "",
        documentType: "",
        passportSeries: "",
        passportNumber: "",
        issuedBy: "",
        issueDate: "",
      },
      isSubmitted: false,
    }
  },
  validations: {
    userForm: {
      name: {
        required,
      },
      surname: {
        required,
      },
      birthday: {
        required,
        tooOld: (value) => new Date().getFullYear() - value.slice(0, 4) < 150,
        tooYoung: (value) => {
          const currentDate = new Date().toJSON().slice(0, 10)
          if (+currentDate.slice(0, 4) - +value.slice(0, 4) > 18) {
            return true
          }
          if (
            +currentDate.slice(0, 4) - 18 >= +value.slice(0, 4) &&
            +currentDate.slice(5, 7) >= +value.slice(5, 7) &&
            +currentDate.slice(8, 10) >= +value.slice(8, 10)
          ) {
            return true
          } else {
            return false
          }
        },
      },
      phoneNumber: {
        required,
        correctPhone: (value) => value.length === 11 && value[0] === "7",
      },
      clientGroup: {
        required,
      },
      city: {
        required,
      },
      documentType: {
        required,
      },
      issueDate: {
        required,
        correctDate: (value) =>
          new Date().getFullYear() - value.slice(0, 4) < 100,
      },
    },
  },
  methods: {
    handleSubmit() {
      console.log(this.userForm)

      this.isSubmitted = true
      this.$v.$touch()

      if (this.$v.$invalid) {
        return null
      } else {
        alert("Форма успешно отправлена")
      }
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="form_wrapper">
      <div class="tip">* - поле обязательно к заполнению</div>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="row">
          <label>
            <span class="field_name">Имя*</span>
            <input
              v-model="userForm.name"
              :class="{ input_error: isSubmitted && $v.userForm.name.$error }"
            />
            <div v-if="isSubmitted && !$v.userForm.name.required" class="error">
              Обязательное поле
            </div>
          </label>
          <label>
            <span class="field_name">Фамилия*</span>
            <input
              v-model="userForm.surname"
              :class="{
                input_error: isSubmitted && $v.userForm.surname.$error,
              }"
            />
            <div
              v-if="isSubmitted && !$v.userForm.surname.required"
              class="error"
            >
              Обязательное поле
            </div>
          </label>
        </div>
        <div class="row">
          <label class="single">
            <span class="field_name">Отчество</span>
            <input v-model="userForm.patronymic" />
          </label>
        </div>
        <div class="row">
          <label>
            <span class="field_name">Дата рождения*</span>
            <input
              type="date"
              v-model="userForm.birthday"
              :class="{
                input_error: isSubmitted && $v.userForm.birthday.$error,
              }"
            />
            <div
              v-if="isSubmitted && !$v.userForm.birthday.required"
              class="error"
            >
              Обязательное поле
            </div>
            <div
              v-else-if="isSubmitted && !$v.userForm.birthday.tooOld"
              class="error"
            >
              Некорректная дата рождения
            </div>
            <div
              v-else-if="isSubmitted && !$v.userForm.birthday.tooYoung"
              class="error"
            >
              Вы должны быть не младше 18 лет
            </div>
          </label>
          <label>
            <span class="field_name">Номер телефона*</span>
            <input
              placeholder="Формат номера 7..."
              type="number"
              v-model="userForm.phoneNumber"
              :class="{
                input_error: isSubmitted && $v.userForm.phoneNumber.$error,
              }"
            />
            <div
              v-if="isSubmitted && !$v.userForm.phoneNumber.required"
              class="error"
            >
              Обязательное поле
            </div>
            <div
              v-else-if="isSubmitted && !$v.userForm.phoneNumber.correctPhone"
              class="error"
            >
              Некорректный номер
            </div>
          </label>
        </div>
        <div class="short_row">
          <span class="field_name underline">Пол</span>
          <div class="short_row">
            <label class="short_row">
              <span>Мужской</span>
              <input
                v-model="userForm.gender"
                class="radio"
                name="gender"
                type="radio"
                value="male"
              />
            </label>
            <label class="short_row">
              <span>Женский</span>
              <input
                v-model="userForm.gender"
                class="radio"
                name="gender"
                type="radio"
                value="female"
              />
            </label>
          </div>
        </div>
        <div class="row">
          <label>
            <span class="field_name">Группа клиентов*</span>
            <select
              v-model="userForm.clientGroup"
              size="3"
              multiple
              :class="{
                input_error: isSubmitted && $v.userForm.clientGroup.$error,
              }"
            >
              <option
                v-for="clientGroup in contentData.clientGroups"
                :key="clientGroup.name"
              >
                {{ clientGroup.name }}
              </option>
            </select>
            <div
              v-if="isSubmitted && !$v.userForm.clientGroup.required"
              class="error"
            >
              Обязательное поле
            </div>
          </label>
          <label>
            <span class="field_name">Лечащий врач</span>
            <select v-model="userForm.doctor">
              <option disabled value="" hidden>Выбрать лечащего врача</option>
              <option v-for="doctor in contentData.doctors" :key="doctor.name">
                {{ doctor.name }}
              </option>
            </select>
          </label>
        </div>
        <div>
          <label class="short_row">
            <span class="field_name underline">Не отправлять СМС</span>
            <input
              v-model="userForm.isSendMessage"
              type="checkbox"
              class="checkbox"
            />
          </label>
        </div>
        <div class="row">
          <label>
            <span class="field_name">Индекс</span>
            <input v-model="userForm.index" />
          </label>
          <label>
            <span class="field_name">Страна</span>
            <input v-model="userForm.country" />
          </label>
        </div>
        <div class="row">
          <label>
            <span class="field_name">Область</span>
            <input v-model="userForm.region" />
          </label>
          <label>
            <span class="field_name">Город*</span>
            <input
              v-model="userForm.city"
              :class="{
                input_error: isSubmitted && $v.userForm.city.$error,
              }"
            />
            <div
              v-if="isSubmitted && !$v.userForm.clientGroup.required"
              class="error"
            >
              Обязательное поле
            </div>
          </label>
        </div>
        <div class="row">
          <label>
            <span class="field_name">Улица</span>
            <input v-model="userForm.street" />
          </label>
          <label>
            <span class="field_name">Дом</span>
            <input v-model="userForm.house" />
          </label>
        </div>
        <div class="row">
          <label class="single">
            <span class="field_name">Тип документа*</span>
            <select
              v-model="userForm.documentType"
              :class="{
                input_error: isSubmitted && $v.userForm.documentType.$error,
              }"
            >
              <option disabled value="" hidden>Выбрать тип документа</option>
              <option
                v-for="documentType in contentData.documentTypes"
                :key="documentType.name"
              >
                {{ documentType.name }}
              </option>
            </select>
            <div
              v-if="isSubmitted && !$v.userForm.documentType.required"
              class="error"
            >
              Обязательное поле
            </div>
          </label>
        </div>
        <div class="row">
          <label>
            <span class="field_name">Серия</span>
            <input type="number" v-model="userForm.passportSeries" />
          </label>
          <label>
            <span class="field_name">Номер</span>
            <input type="number" v-model="userForm.passportNumber" />
          </label>
        </div>
        <div class="row">
          <label>
            <span class="field_name">Кем выдан</span>
            <input v-model="userForm.issuedBy" />
          </label>
          <label>
            <span class="field_name">Дата выдачи*</span>
            <input
              v-model="userForm.issueDate"
              type="date"
              :class="{
                input_error: isSubmitted && $v.userForm.issueDate.$error,
              }"
            />
            <div
              v-if="isSubmitted && !$v.userForm.issueDate.required"
              class="error"
            >
              Обязательное поле
            </div>
            <div
              v-else-if="isSubmitted && !$v.userForm.issueDate.correctDate"
              class="error"
            >
              Некорректная дата
            </div>
          </label>
        </div>
        <button class="btn">Отправить</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="sass">
.container
  min-height: 100vh
  padding: 10px

  background-color: #eff6ff

  display: flex
  justify-content: center
  align-items: center

.form_wrapper
  position: relative
  max-width: 1000px
  width: 100%
  padding: 20px 40px

  background-color: #fff
  box-shadow: 0 0 5px 1px gray
  border-radius: 20px

.tip
  position: absolute
  right: 40px
  top: 10px

  font-size: 0.8rem

.form
  display: flex
  flex-direction: column
  gap: 10px

  font-size: 1.1rem

.row
  width: 100%

  display: flex
  flex-direction: row
  align-items: center
  column-gap: 20px

.short_row
  width: max-content

  display: flex
  align-items: center
  flex-direction: row
  gap: 20px

label
  position: relative
  width: 100%

  display: flex
  flex-direction: column

input, select
  width: 100%
  max-width: 450px
  padding: 5px 10px

  border: 2px solid #6366f1
  border-radius: 5px

  font-size: 1rem

  &:focus
    border-color: #60a5fa
    outline: none
.field_name
  font-weight: 500

.radio,.checkbox
  height: auto
  width: auto

.btn
  margin: 10px auto 0px auto
  padding: 5px 10px

  background-color:#2563eb
  border-radius: 5px

  cursor: pointer
  color: #fff
  font-size: 1.2rem
  font-weight: 500
  &:hover
    background-color: #fff
    color:#2563eb
    outline: 2px solid #2563eb

.underline
  text-decoration: underline
  text-decoration-color: #6366f1
  text-decoration-thickness: 2px
  text-underline-offset: 2px

.single
  width: calc(50% - 10px)

.input_error
  border-color: #ef4444

.error
  position: absolute
  right: 10px
  top: calc(100% - 7.5px)

  padding: 0px 4px

  background-color:#f87171
  border-radius: 5px

  font-size: 0.85rem
  color: white

@media (max-width: 600px)
  .tip
    right: 20px
  .form_wrapper
    padding: 20px

@media (max-width: 576px)
  input,select
    max-width: none

  .single
    width: 100%
  .row
    flex-direction: column
    row-gap: 10px

@media (max-width: 360px)
  .short_row
    div
      .short_row
        gap: 5px
</style>
