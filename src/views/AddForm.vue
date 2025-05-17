<template>
  <v-container style="border: 1px solid rgb(var(--v-theme-border))">
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="activeTab" class="mb-6">
          <v-tab value="manually">Manually</v-tab>
          <v-tab value="import">Import CSV</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row v-if="activeTab === 'manually'">
      <v-col cols="12">
        <v-form ref="form" v-model="isFormValid">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="formData.name"
                label="Name"
                :rules="[(v) => !!v || 'Name is required']"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="formData.email"
                label="Email address"
                :rules="[(v) => !!v || 'Email is required', (v) => /.+@.+\..+/.test(v) || 'Email must be valid']"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="formData.password"
                label="Password"
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="formData.phone"
                label="Phone number"
                :rules="[(v) => !!v || 'Phone number is required']"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select v-model="formData.gender" :items="genderOptions" label="Gender" variant="outlined" density="comfortable"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select v-model="formData.class" :items="classOptions" label="Class" variant="outlined" density="comfortable"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="formData.memo"
                label="메모"
                variant="outlined"
                density="comfortable"
                rows="3"
                auto-grow
                counter
                maxlength="500"
                hint="추가 정보를 입력하세요"
                persistent-hint
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <TextFieldWithButton
                v-model="formData.address"
                :textFieldProps="{
                  label: '코드',
                  placeholder: '코드를 입력하세요',
                  type: 'text',
                }"
                :buttonProps="{
                  disabled: false,
                }"
                :dialogProps="{
                  openComponent: AddressList,
                  maxWidth: 1000,
                  dialogTitle: '코드 검색',
                  displayField: 'address',
                  buttonColor: 'primary',
                }"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <DoubleTextFieldWithButton
                v-model:modelValue1="formData.address"
                v-model:modelValue2="formData.zipCode"
                :textField1Props="{
                  label: '코드',
                  placeholder: '코드를 입력하세요',
                  type: 'text',
                }"
                :textField2Props="{
                  label: '코드명',
                  placeholder: '코드명을 입력하세요',
                  type: 'text',
                }"
                :dialogProps="{
                  openComponent: AddressList,
                  maxWidth: 1000,
                  dialogTitle: '코드 검색',
                  displayField1: 'address',
                  displayField2: 'zipCode',
                  buttonColor: 'primary',
                }"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <TripleTextFieldWithButton
                v-model:modelValue1="formData.address"
                v-model:modelValue2="formData.zipCode"
                v-model:modelValue3="formData.addressDetail"
                :textField1Props="{
                  label: '주소',
                  placeholder: '주소를 입력하세요',
                  type: 'text',
                }"
                :textField2Props="{
                  label: '우편번호',
                  placeholder: '우편번호를 입력하세요',
                  type: 'text',
                }"
                :textField3Props="{
                  label: '상세주소',
                  placeholder: '상세주소를 입력하세요',
                  type: 'text',
                }"
                :dialogProps="{
                  openComponent: AddressList,
                  maxWidth: 1000,
                  dialogTitle: '코드 검색',
                  displayField1: 'address',
                  displayField2: 'zipCode',
                  displayField3: 'addressDetail',
                  buttonColor: 'primary',
                }"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="primary" :disabled="!isFormValid" @click="submitForm" class="px-6"> 등록하기 </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <v-file-input
          v-model="csvFile"
          accept=".csv"
          label="Upload CSV file"
          variant="outlined"
          density="comfortable"
          prepend-icon="mdi-file-upload"
        ></v-file-input>
        <v-btn color="primary" :disabled="!csvFile" @click="importCSV" class="mt-4"> Import CSV </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, readonly } from "vue";
import MemberCardList from "@/views/templates/MemberCardList.vue";
import AddressList from "@/views/templates/AddressList.vue";
import DoubleTextFieldWithButton from "@/components/common/TextFieldWithButton/DoubleTextFieldWithButton.vue";
import TextFieldWithButton from "@/components/common/TextFieldWithButton/TextFieldWithButton.vue";
import TripleTextFieldWithButton from "@/components/common/TextFieldWithButton/TripleTextFieldWithButton.vue";

const activeTab = ref("manually");
const isFormValid = ref(false);
const form = ref(null);
const csvFile = ref(null);
const formData = reactive({
  name: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  class: "",
  memo: "",
  address: "",
  addressDetail: "",
  zipCode: "",
});

const genderOptions = ["Male", "Female", "Other"];

const classOptions = ["Class A", "Class B", "Class C", "Class D"];

const submitForm = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
  }
};

const importCSV = () => {
  // TODO: Implement CSV import logic
  console.log("Importing CSV:", csvFile.value);
};
</script>

<style scoped></style>
